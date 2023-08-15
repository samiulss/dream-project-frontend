import './downloadList.scss';

function DownloadList({ file, index }) {
  return (
    <tbody>
      <tr>
        <td>{index + 1}</td>
        <td>{file.title}</td>
        <td>{file.downloadCount}</td>
        <td>{file.licence}</td>
      </tr>
    </tbody>
  );
}

export default DownloadList;
