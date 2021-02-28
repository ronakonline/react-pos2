import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

var arrButtons = [];
var marks = [];
export default function Square() {
  const [todos, setTodos] = useState([]);
  const [total, setTotal] = useState(0);
  const [receivedamt, setReceivedamt] = useState("");
  const [changeamt, setChangeamt] = useState(0);
  var received = 0;
  var change = 0;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    if (total === 0 || marks.length === 0) {
      alert("No Mark or Amount Selected");
    } else {
      setIsOpen(true);
    }
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
    window.location.reload();
  }
  function handleaddmark(e) {
    e.preventDefault();
    const value = e.target.value;
    if (marks.includes(value)) {
      e.target.style.borderColor = "silver";
      const index = marks.indexOf(value);
      if (index > -1) {
        marks.splice(index, 1);
        const newList = todos.filter((item) => item !== value);
        setTodos(newList);
      }
    } else {
      if (marks.length === 5) {
        alert("Cant add more than 5 numbers");
      } else {
        marks.push(e.target.value);
        setTodos((prevTodos) => {
          return [...prevTodos, 2];
        });
        // console.log(marks);
        e.target.style.borderColor = "red";
      }
    }
  }

  function handleChange(newValue) {
    setTotal(total + parseInt(newValue));
  }
  function clearmarks() {
    marks = [];
    setTodos([]);
    setTotal(0);
    window.location.reload();
  }
  for (let i = 1; i <= 20; i++) {
    arrButtons.push(
      <input
        className="pos-btn"
        type="button"
        id={i}
        value={i}
        key={i}
        onClick={handleaddmark}
      />
    );
  }

  function handlereceivedamt(e) {
    if (e.target.value !== "d") {
      received = String(receivedamt) + String(e.target.value);
      change = parseFloat(received) - parseFloat(total);
    } else {
      received = String(receivedamt).slice(0, -1);
      change = parseFloat(received) - parseFloat(total);
    }
    setReceivedamt(received);
    setChangeamt(change);
  }

  return (
    <>
      <Price total={total} onChange={handleChange} />
      <div className="square">
        {arrButtons}
        <button className="btn" onClick={openModal}>
          CASH
        </button>
        <button className="btn" onClick={clearmarks}>
          CLEAR
        </button>
      </div>
      <SelectedNumber marks={marks} total={total} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-header">
          <span className="modal-head-text">Cash</span>
        </div>
        <div className="modal-container">
          <div className="table-container">
            <span className="modal-heading">Enter Amount Received</span>
            <table className="modal-table">
              <tr>
                <td>Total</td>
                <td>${total}</td>
              </tr>
              <tr>
                <td>Received</td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    value={receivedamt}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Change</td>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    value={changeamt}
                  ></input>
                </td>
              </tr>
            </table>
            <button className="modal-btn">Confirm</button>
            <button className="modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
          <div className="modal-keyboard">
            <input
              type="button"
              value="7"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="8"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="9"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="4"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="5"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="6"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="1"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="2"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="3"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="0"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="."
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
            <input
              type="button"
              value="d"
              className="modal-kb-btn"
              onClick={handlereceivedamt}
            ></input>
          </div>
          <div className="clear"></div>
        </div>
      </Modal>
    </>
  );
}

function SelectedNumber({ marks, total }) {
  return (
    <div className="SelectedSquare">
      <p>Number Selected :</p>
      {marks.map(function (d) {
        return <p>Mark: {d}</p>;
      })}
      <p className="price">Total Amount : $ {total} </p>
    </div>
  );
}

function Price(props) {
  // const [total, setTotal] = useState(0);
  // function addamount(e) {
  //   setTotal(total + parseInt(e.target.value));
  //   console.log(total);
  // }
  function handleChange(event) {
    // Here, we invoke the callback with the new value
    props.onChange(event.target.value);
  }
  return (
    <>
      <div className="PriceSquare">
        <div className="row">
          <button className="roundbutton" value="1" onClick={handleChange}>
            $1
          </button>
          <button className="roundbutton" value="5" onClick={handleChange}>
            $5
          </button>
        </div>
        <div className="row">
          <button className="roundbutton" value="10" onClick={handleChange}>
            $10
          </button>
          <button className="roundbutton" value="20" onClick={handleChange}>
            $20
          </button>
        </div>
      </div>
    </>
  );
}
