/**
 * Helper to convert various Google Drive link formats into a direct download link.
 *
 * Supported input formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?export=download&id=FILE_ID
 * - Raw FILE_ID (e.g. 1a2B3c4D5e...)
 */
export function getGoogleDriveDirectDownloadUrl(inputUrlOrId: string): string {
  if (!inputUrlOrId) return '';
  const trimmed = inputUrlOrId.trim();

  // If already an export=download link
  if (trimmed.includes('drive.google.com/uc?') && trimmed.includes('export=download')) {
    return trimmed;
  }

  // Extract from /file/d/FILE_ID/...
  const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  }

  // Extract from ?id=FILE_ID or &id=FILE_ID
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    return `https://drive.google.com/uc?export=download&id=${idParamMatch[1]}`;
  }

  // If it's a raw file ID (alphanumeric, underscores, hyphens, min 15 chars)
  if (/^[a-zA-Z0-9_-]{15,}$/.test(trimmed)) {
    return `https://drive.google.com/uc?export=download&id=${trimmed}`;
  }

  return trimmed;
}

export function extractGoogleDriveFileId(inputUrlOrId: string): string | null {
  if (!inputUrlOrId) return null;
  const trimmed = inputUrlOrId.trim();

  const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) return fileIdMatch[1];

  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  if (/^[a-zA-Z0-9_-]{15,}$/.test(trimmed)) return trimmed;

  return null;
}
