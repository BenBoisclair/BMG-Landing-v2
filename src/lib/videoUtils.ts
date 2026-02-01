export type VideoType = 'youtube' | 'vimeo' | 'direct' | null;

export interface VideoInfo {
  type: VideoType;
  embedUrl: string | null;
  directUrl: string | null;
}

export interface VimeoInfo {
  id: string;
  hash: string | null;
}

/**
 * Extract YouTube video ID from various URL formats
 * Supports: watch, embed, youtu.be, shorts, and privacy-enhanced URLs
 */
export function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Extract Vimeo video ID and optional private hash from various URL formats
 * Private videos have format: vimeo.com/123456789/abcdef123
 */
export function getVimeoId(url: string): VimeoInfo | null {
  const patterns = [
    /vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/,
    /player\.vimeo\.com\/video\/(\d+)(?:\?h=([a-zA-Z0-9]+))?/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        id: match[1],
        hash: match[2] || null,
      };
    }
  }
  return null;
}

/**
 * Check if URL is a direct video file
 * Uses proper URL parsing to avoid false positives like "video.mp4.html"
 */
function isDirectVideoUrl(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];

  try {
    const pathname = new URL(url).pathname.toLowerCase();
    return videoExtensions.some(ext => pathname.endsWith(ext));
  } catch {
    // Fallback for malformed URLs - check if extension appears at end or before query string
    const urlLower = url.toLowerCase();
    return videoExtensions.some(ext =>
      urlLower.endsWith(ext) || urlLower.includes(ext + '?')
    );
  }
}

/**
 * Parse a video URL and return info about how to embed it
 */
export function parseVideoUrl(url: string | undefined | null): VideoInfo {
  if (!url) {
    return { type: null, embedUrl: null, directUrl: null };
  }

  // Check for YouTube - use privacy-enhanced domain
  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0`,
      directUrl: null,
    };
  }

  // Check for Vimeo - include hash for private videos
  const vimeoInfo = getVimeoId(url);
  if (vimeoInfo) {
    const hashParam = vimeoInfo.hash ? `h=${vimeoInfo.hash}&` : '';
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoInfo.id}?${hashParam}autoplay=1&muted=1&loop=1&background=1`,
      directUrl: null,
    };
  }

  // Check for direct video URL
  if (isDirectVideoUrl(url)) {
    return {
      type: 'direct',
      embedUrl: null,
      directUrl: url,
    };
  }

  // Unknown URL type - treat as direct if it has a valid URL format
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return {
      type: 'direct',
      embedUrl: null,
      directUrl: url,
    };
  }

  return { type: null, embedUrl: null, directUrl: null };
}
