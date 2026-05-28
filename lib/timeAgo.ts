export function getTimeAgo(dateString: string | undefined): string {
  if (!dateString) return 'Bilinmeyen zaman';

  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Az önce yüklendi';
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} dakika önce yüklendi`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} saat önce yüklendi`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} gün önce yüklendi`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ay önce yüklendi`;
  }
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} yıl önce yüklendi`;
}
