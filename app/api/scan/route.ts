import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { url, forceRescan } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    let domain;
    try {
      domain = new URL(targetUrl).origin;
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Check cache first
    if (!forceRescan) {
      const { data: cached, error } = await supabase
        .from('scans')
        .select('*')
        .eq('domain', domain)
        .single();
      
      if (cached && !error) {
        return NextResponse.json({
          domain: cached.domain,
          isProtected: cached.isprotected,
          cached: true,
          timestamp: cached.timestamp,
          details: {
            robotsTxt: cached.robotstxt,
            xRobotsTag: cached.xrobotstag,
            metaTags: cached.metatags,
            aiTxt: cached.aitxt
          },
          suggestions: generateSuggestions(
            cached.robotstxt === 'Protected',
            cached.xrobotstag === 'Protected',
            cached.metatags === 'Protected',
            cached.aitxt === 'Protected'
          )
        });
      }
    }

    const headers = { 'User-Agent': 'MaangoCloneBot/1.0' };

    // 1. Check robots.txt
    const robotsRes = await fetch(`${domain}/robots.txt`, { headers }).catch(() => null);
    const robotsTxt = robotsRes?.ok ? await robotsRes.text() : null;
    
    // 2. Check ai.txt
    const aiRes = await fetch(`${domain}/.well-known/ai.txt`, { headers }).catch(() => null);
    const aiTxt = aiRes?.ok ? await aiRes.text() : null;

    // 3. Check Headers & Meta
    const homeRes = await fetch(domain, { headers }).catch(() => null);
    const homeHtml = homeRes?.ok ? await homeRes.text() : null;
    const xRobotsTag = homeRes?.headers.get('x-robots-tag') || null;

    // Basic analysis logic
    const hasRobotsBlocking = !!robotsTxt && /(gptbot|claudebot|ccbot|anthropic-ai|applebot-extended)/i.test(robotsTxt);
    const hasHeaderBlocking = !!xRobotsTag && /(noai|noindex)/i.test(xRobotsTag);
    const hasMetaBlocking = !!homeHtml && /<meta[^>]*name=["']?robots["']?[^>]*content=["']?[^"']*(noai|noindex)[^"']*["']?/i.test(homeHtml);
    const hasAiTxt = !!aiTxt;

    const isProtected = hasRobotsBlocking || hasHeaderBlocking || hasMetaBlocking || hasAiTxt;

    const details = {
      robotsTxt: hasRobotsBlocking ? 'Protected' : 'Unprotected',
      xRobotsTag: hasHeaderBlocking ? 'Protected' : 'Unprotected',
      metaTags: hasMetaBlocking ? 'Protected' : 'Unprotected',
      aiTxt: hasAiTxt ? 'Protected' : 'Unprotected'
    };

    // Save to DB (Upsert via Supabase API)
    const { data: savedRow, error: upsertError } = await supabase
      .from('scans')
      .upsert({
        domain,
        isprotected: isProtected,
        robotstxt: details.robotsTxt,
        xrobotstag: details.xRobotsTag,
        metatags: details.metaTags,
        aitxt: details.aiTxt,
        timestamp: new Date().toISOString()
      }, { onConflict: 'domain' })
      .select()
      .single();

    if (upsertError) {
      console.error("Supabase UPSERT Error:", upsertError);
    }

    const savedTimestamp = savedRow?.timestamp || new Date().toISOString();

    return NextResponse.json({
      domain,
      isProtected,
      cached: false,
      timestamp: savedTimestamp,
      details,
      suggestions: generateSuggestions(hasRobotsBlocking, hasHeaderBlocking, hasMetaBlocking, hasAiTxt)
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function generateSuggestions(hasRobots: boolean, hasHeader: boolean, hasMeta: boolean, hasAiTxt: boolean) {
  const suggestions = [];
  
  if (!hasRobots) {
    suggestions.push({
      title: "Update robots.txt",
      description: "Your robots.txt file is missing or does not block common AI crawlers. Add explicit Disallow directives for User-Agents like GPTBot, ClaudeBot, and CCBot.",
      code: `User-agent: GPTBot\nDisallow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /`
    });
  }

  if (!hasMeta && !hasHeader) {
    suggestions.push({
      title: "Add HTML Meta Tags",
      description: "Add a robots meta tag to your site's <head> to instruct web crawlers not to use your content for AI training.",
      code: `<meta name="robots" content="noai, noimageai">`
    });
    
    suggestions.push({
      title: "Configure HTTP Headers",
      description: "For files like PDFs or images that don't have HTML <head> sections, configure your web server to return an X-Robots-Tag header.",
      code: `X-Robots-Tag: noai, noindex`
    });
  }

  if (!hasAiTxt) {
    suggestions.push({
      title: "Implement ai.txt",
      description: "The ai.txt standard is a newer, dedicated way to express AI data mining policies. Create a /.well-known/ai.txt file.",
      code: `User-Agent: *\nDisallow: /`
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      title: "You are fully protected",
      description: "Excellent work. You have implemented multiple layers of defense against AI scraping.",
      code: null
    });
  }
  return suggestions;
}
