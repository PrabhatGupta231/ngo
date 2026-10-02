export type Platform = 'youtube' | 'instagram' | 'facebook' | 'unknown';

export function detectPlatform(url: string): Platform {
  if (!url) return 'unknown';
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return 'youtube';
  if (lowerUrl.includes('instagram.com')) return 'instagram';
  if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch')) return 'facebook';
  
  return 'unknown';
}

export function parseMediaUrl(url: string): { platform: Platform; embedUrl: string | null; isShort: boolean } {
  const platform = detectPlatform(url);
  let embedUrl = null;
  let isShort = false;

  try {
    if (platform === 'youtube') {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        videoId = urlParams.get('v') || '';
      } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
        isShort = true;
      } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('youtube.com/embed/')[1]?.split('?')[0];
      }

      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (platform === 'instagram') {
      if (url.includes('/p/') || url.includes('/reel/')) {
        const cleanUrl = url.split('?')[0].replace(/\/$/, '');
        embedUrl = `${cleanUrl}/embed`;
        isShort = url.includes('/reel/');
      } else if (url.includes('/embed')) {
        embedUrl = url;
      }
    } else if (platform === 'facebook') {
      const encodedUrl = encodeURIComponent(url);
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=560`;
    }
  } catch (e) {
    console.error('Error parsing media URL:', e);
  }

  return { platform, embedUrl, isShort };
}
