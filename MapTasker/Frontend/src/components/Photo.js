import Button from 'react-bootstrap/Button';
function Photo(props) {

    function handleClick() {
        alert('hihi');
      }

    return (
        <div className='Photo'>
            <label>Fotografija</label>
            <div className="button-4">
                <Button variant="contained" component="label" role="button" onClick={handleClick}>
                         Upload
                </Button>
            </div>
        </div>
    );
}
export default Photo;




