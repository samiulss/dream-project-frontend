import DataTable from '../../shareComponent/dataTable/DataTable';

function DownloadList({ ...props }) {
  return (
    <DataTable data={props} />
  );
}

export default DownloadList;
