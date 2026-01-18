
import React from "react";

const RoomPaginator = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goPrev = () => onPageChange(Math.max(1, currentPage - 1));
  const goNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button onClick={goPrev} disabled={currentPage === 1}>
        Prev
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          style={{
            fontWeight: pageNumber === currentPage ? "bold" : "normal",
            background: pageNumber === currentPage ? "#eee" : "transparent",
          }}
        >
          {pageNumber}
        </button>
      ))}

      <button onClick={goNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default RoomPaginator;






// import React from 'react'

// const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)


//     return (
//         <nav>
//             <ul className='pagination, justify-content-center'>
//                 {pageNumbers.map((pageNumber) => (
//                     <li key={pageNumber}
//                         className={'page-item ${currentPage === pageNumber? "active" : ""}'}>
//                         <button onClick={() => onPageChange(pageNumber)} className='page-link'>
//                             {pageNumber}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     )
// }

// export default RoomPaginator