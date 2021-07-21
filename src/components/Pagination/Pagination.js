import styles from "./Pagination.module.css";

export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrev
}) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        type="button"
        onClick={() => {
          onPrev();
        }}
      >
        Prev
      </button>
      <div className={styles.paginationPagesInfo}>
        Page {currentPage} of {totalPages}
      </div>
      <button
        className={styles.paginationButton}
        type="button"
        onClick={() => {
          onNext();
        }}
      >
        Next
      </button>
    </div>
  );
}
