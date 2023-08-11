import { Toaster } from 'react-hot-toast';
import './help.scss';

function Help() {
  return (
    <div className="help d-flex rounded-4 base-bg-color-1">
      <span className="svg-icon get-help" />
      <span>Help</span>
      <Toaster />
    </div>
  );
}

export default Help;
