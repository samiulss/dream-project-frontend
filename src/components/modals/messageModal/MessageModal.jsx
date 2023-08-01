import './messageModal.scss';

function MessageModal() {
  return (
    <div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
              <button type="button" title="Close" className="btn-close shadow-none base-bg-color-1 rounded-5 text-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Vitae, molestias nostrum adipisci repudiandae reiciendis ipsam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
