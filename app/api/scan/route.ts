import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    let domain;
    try {
      domain = new URL(targetUrl).origin;
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
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

    return NextResponse.json({
      domain,
      isProtected,
      details: {
        robotsTxt: hasRobotsBlocking ? 'Protected' : 'Unprotected',
        xRobotsTag: hasHeaderBlocking ? 'Protected' : 'Unprotected',
        metaTags: hasMetaBlocking ? 'Protected' : 'Unprotected',
        aiTxt: hasAiTxt ? 'Protected' : 'Unprotected'
      }
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
