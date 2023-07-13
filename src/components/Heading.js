
function Heading(props) {
    return (
      <div>
        <h1>{props.angka}</h1>
        <p style={{color:props.color}} >{props.judul}</p>
        <button>Click</button>
      </div>
    );
  }
  
  export default Heading;
  