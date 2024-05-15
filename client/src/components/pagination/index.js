// import React, { useState } from 'react';
// import { Pagination, PaginationItem, PaginationLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
// import ReactPaginate from 'react-paginate';

// function Index() {

//     const [activePage, setActivePage] = useState(0);
//   const [perPage, setPerPage] = useState(5); // Number of items per page
//   const data = []; // Your data array

//   // Logic to handle page change
//   const handlePageChange = ({ selected }) => {
//     setActivePage(selected);
//   };

//   // Calculate total pages
//   const totalPages = Math.ceil(data.length / perPage);

//   // Generate pagination items dynamically
//   const renderPaginationItems = () => {
//     const items = [];
//     for (let i = 0; i < totalPages; i++) {
//       items.push(
//         <PaginationItem key={i} active={activePage === i}>
//           <PaginationLink onClick={() => setActivePage(i)} href="#">
//             {i + 1}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }
//     return items;
//   };

//   // Handle items per page change
//   const handlePerPageChange = (value) => {
//     setPerPage(value);
//     setActivePage(0); // Reset active page to 0 when changing items per page
//   };


//   return (
//     <>
//     <Pagination className="justify-content-center">
//     <PaginationItem disabled={activePage === 0}>
//         <PaginationLink previous onClick={() => setActivePage(activePage - 1)} href="#" />
//     </PaginationItem>
//     {renderPaginationItems()}
//     <PaginationItem disabled={activePage === totalPages - 1}>
//         <PaginationLink next onClick={() => setActivePage(activePage + 1)} href="#" />
//     </PaginationItem>
//     </Pagination>
//     <Dropdown className="float-right" isOpen={false} toggle={() => {}}>
//     <DropdownToggle caret>
//         Items per Page
//     </DropdownToggle>
//     <DropdownMenu>
//         <DropdownItem onClick={() => handlePerPageChange(5)}>5</DropdownItem>
//         <DropdownItem onClick={() => handlePerPageChange(10)}>10</DropdownItem>
//         <DropdownItem onClick={() => handlePerPageChange(15)}>15</DropdownItem>
//         <DropdownItem onClick={() => handlePerPageChange(20)}>20</DropdownItem>
//     </DropdownMenu>
//     </Dropdown>
//     </>
//   )
// }

// export default Index;
