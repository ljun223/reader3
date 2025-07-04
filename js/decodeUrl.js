/**
 * 检测并解码可能的加密 M3U8 URL
 * @param {string} url - 从服务器获取的 URL（可能是加密的）
 * @returns {string} - 解码后的 URL（如果有效），否则返回原始字符串
 */
function decodeM3U8Url(url) {
  // 如果已经是合法的 URL（未加密），直接返回
  if (isValidM3U8Url(url)) {
    return url;
  }

  // 尝试不同的解码组合
  const decodeAttempts = [
    (str) => unescape(str), // 仅 URL-decode
    (str) => atob(str),               // 仅 Base64-decode
    (str) => unescape(atob(str)), // 先 Base64-decode，再 URL-decode
    (str) => atob(unescape(str)), // 先 URL-decode，再 Base64-decode
  ];

  for (const decodeFn of decodeAttempts) {
    try {
      const decoded = decodeFn(url);
      if (isValidM3U8Url(decoded)) {
        return decoded;
      }
    } catch (e) {
      // 解码失败，继续尝试下一种方式
      continue;
    }
  }

  // 所有方式都失败，返回原始字符串
  return url;
}

/**
 * 检查字符串是否是有效的 M3U8 URL
 * @param {string} str - 待检测的字符串
 * @returns {boolean}
 */
function isValidM3U8Url(str) {
  return (
    typeof str === "string" &&
    (str.startsWith("http://") || 
     str.startsWith("https://") || 
     str.startsWith("://") ||
     str.includes("url=") ||
     str.includes(".m3u8") ||
     str.includes(".mp4") ||
     str.includes(".htm"))
  );
}