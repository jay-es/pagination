function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

/**
 * ページネーションの配列を生成する
 *
 * @param currentPage 現在のページ番号
 * @param totalPages 総ページ数
 * @returns ページ番号の配列。省略箇所は null になる
 *          例: [1, 2, 3, 4, 5, null, 10]
 */
export function paginate(
  currentPage: number,
  totalPages: number,
): (number | null)[] {
  if (currentPage < 1 || currentPage > totalPages) {
    throw new RangeError();
  }

  // 総ページ数が少なく、ページャーの省略が不要な場合
  // 例: [1, 2, 3, 4, 5, 6, 7]
  if (totalPages <= 7) {
    return range(1, totalPages);
  }

  // 現在ページが先頭に近く、末尾側を省略する場合
  // 例: [1, 2, 3, 4, 5, null, 10]
  if (currentPage <= 4) {
    return [...range(1, 5), null, totalPages];
  }

  // 現在ページが末尾に近く、先頭側を省略する場合
  // 例: [1, null, 6, 7, 8, 9, 10]
  if (currentPage >= totalPages - 3) {
    return [1, null, ...range(totalPages - 4, totalPages)];
  }

  // 上記以外。現在ページを中央に、両側を省略する場合
  // 例: [1, null, 4, 5, 6, null, 10]
  const middlePages = range(currentPage - 1, currentPage + 1);
  return [1, null, ...middlePages, null, totalPages];
}
