import React from 'react';

export default function page() {
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Serial Number', accessor: 'serialNumber' },
    { header: 'SKU Number', accessor: 'skuNumber' },
    { header: 'Location', accessor: 'location' },
    { header: 'Warranty End Date', accessor: 'warrantyEndDate' },
    { header: 'Status', accessor: 'status' },
    { header: 'Added By', accessor: 'addedBy' },
    { header: 'Insertion Date', accessor: 'insertionDate' },
    { header: 'Modification Date', accessor: 'modificationDate' }
  ];
  return <div>page</div>;
}
