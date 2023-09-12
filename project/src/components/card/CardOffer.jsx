import React, { useEffect, useState } from "react";
import "./cardOffer.css";
import { Button, Dropdown, Modal, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../InputText";
import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import { addOfferSchema } from "../../schemas/offer.shema";
import {
  applyOffer,
  deleteOffer,
  editOffer,
  getOwnOffers,
  unApplyOffer,
} from "../../api/offer";
import MultipleSelect from "../Select";

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{props.message}</h2>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
}

const CardOffer = ({
  id,
  name,
  description,
  mode,
  requirements,
  category,
  publishedDate,
  owner,
  offers,
  appliers,
}) => {
  const date = new Date(publishedDate);
  const options = { day: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const initialValues = {
    name,
    description,
    requirements,
    category,
    mode,
  };

  const [margin, setMargin] = useState(false);
  const [user, setUser] = useState();

  const [showPopup, setShowPopup] = useState(false);

  function handlePopUp() {
    setShowPopup(true);
  }

  function handleClosePopUp() {
    setShowPopup(false);
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("myData")).user);

    if (
      !document
        .getElementsByTagName("ASIDE")[0]
        .classList.contains("sidebar-mini")
    ) {
      setMargin(true);
    } else {
      setMargin(false);
    }
  }, []);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showApplied, setShowApplied] = useState(false);
  const [applied, setApplied] = useState(
    appliers?.some?.(
      (e) =>
        e.user.toString?.() ===
        JSON.parse(localStorage.getItem("myData")).user?._id?.toString?.()
    ) || false
  );
  const [value, setValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseApplied = () => setShowApplied(false);
  const handleShowApplied = () => setShowApplied(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = async (id) => {
    const response = await deleteOffer(id);
    offers();
  };

  const navigate = useNavigate();

  const handleAplliers = (id) => {
    navigate(`/dashboard/app/groups/appliers/${id}`);
  };

  const handleApply = async (id) => {
    let response;
    console.log(user._id);
    if (!applied) {
      response = await applyOffer(id, user._id);
    } else {
      response = await unApplyOffer(id, user._id);
    }
    if (response.status !== "404") {
      setApplied(!applied);
    }
    offers();
  };

  const options1 = [
    { label: "1ère année ", value: "react  js" },
    { label: "2ème année ", value: "node  js" },
    { label: "3ème année ", value: "angular  js" },
    { label: "4ème année", value: "vue  js" },
    { label: "5ème année ", value: "java" },
    { label: "6ème année", value: "python" },
  ];

  const optionsMode = [
    { label: "Local ", value: "local" },
    { label: "Remote ", value: "remote" },
  ];

  const optionsCategory = [
    { label: "FullTime ", value: "fullTime" },
    { label: "PartTime ", value: "partTime" },
    { label: "Internship ", value: "internship" },
  ];

  return (
    <div
      class="card "
      style={{
        width: "18rem",
        height: "20rem",
        marginLeft: `${margin ? "0rem" : "0rem"}`,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div class="card-body flex flxe-col">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-around align-items-center gap-3">
            {/* <img height="70px" width="80px" src="http://www.ensit.tn/wp-content/uploads/2021/02/1549615448898.png" alt="img" /> */}

            <h5 class="card-title" style={{ fontWeight: "bold" }}>
              {owner.fullName} {owner?.averageRating} ⭐
            </h5>
          </div>
          <h6 class="card-subtitle mb-2 text-body-secondary">
            {formattedDate}
          </h6>
        </div>

        <div className="text-truncate-container">
          {/* <h3 class="card-text px-3" style={{fontWeight:"bold"
    }}>{description}</h3> */}
          <h4>Offer Name:</h4>
          <h5 class="card-title" style={{ fontWeight: "bold" }}>
            {name}
          </h5>
        </div>

        <h4 className="mt-2">Category:</h4>
        <span
          style={{ fontSize: "14px" }}
          className={`badge badge-pill  p-2 mt-1  mx-3 ${
            category === "internship"
              ? "internship"
              : category === "partTime"
              ? "partTime"
              : "fullTime"
          }`}
        >
          {category}
        </span>

        <h4 className="mt-1">Mode:</h4>
        <span
          style={{ fontSize: "14px" }}
          className={`badge badge-pill   p-2 mt-1 mx-3 ${
            mode === "local" ? "partTime" : "fullTime"
          }`}
        >
          {mode}
        </span>

        <div className="card-footer d-flex justify-content-center gap-5">
          {user && user.role !== "user" && user.role !== "expert" ? (
            <Dropdown>
              <Link to="#">
                <Dropdown.Toggle
                  as="span"
                  className="material-symbols-outlined"
                >
                  more_horiz
                </Dropdown.Toggle>
              </Link>
              <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Item
                  onClick={() => {
                    handleAplliers(id);
                  }}
                >
                  Appliers
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleShowEdit();
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <button
              type="button"
              class="btn btn-success"
              onClick={() => {
                handleApply(id);
                handleShowApplied();
              }}
            >
              {applied ? "UnApply" : "Apply"}
            </button>
          )}
          {showPopup && (
            <Popup message="Congratulations!" onClose={handleClosePopUp} />
          )}
          <button
            type="button"
            class="btn btn-outline-success"
            onClick={() => {
              handleShowDetails();
            }}
          >
            Job Details
          </button>
        </div>
      </div>

      <Modal
        style={{ marginTop: "10rem" }}
        show={showDetails}
        onHide={handleCloseDetails}
      >
        <Modal.Header closeButton>
          <Modal.Title>Offer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center">{name}</h2>
          <h4 className="my-3">Description:</h4>
          <h5>{description}</h5>
          <h4 className="my-3">Requirements:</h4>

          {requirements.map((req) => (
            <span
              style={{ fontSize: "14px" }}
              className={`badge badge-pill   p-2 mt-1 mx-3 partTime`}
            >
              {req}
            </span>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal style={{ marginTop: "10rem" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Offer : {` ${name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this offer ?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        style={{ marginTop: "10rem" }}
        show={showApplied}
        onHide={handleCloseApplied}
      >
        <Modal.Header closeButton>
          <Modal.Title>Congratulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>You have applied to</h5> <h3> {name}</h3>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseApplied}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        style={{ marginTop: "5rem" }}
        show={showEdit}
        onHide={handleCloseEdit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Offer : {` ${name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to Update this offer ?</p>

          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { errors, setErrors, setSubmitting }) => {
              console.log(values);
              try {
                const response = await editOffer(id, values);
                handleCloseEdit();
                offers();
                console.log(response);
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={addOfferSchema}
          >
            {({ isSubmitting }) => (
              <Grid container component="main" sx={{ height: "100vh" }}>
                <Grid item xs={12} sm={8} md={12}>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mb: 2 }} />
                    <Form>
                      <Stack sx={{ mt: 1 }} spacing={2}>
                        <Box sx={{ mb: 1 }} />

                        <InputText
                          type="text"
                          name="name"
                          placeholder="Name"
                          variant="outlined"
                          className="mt-4"
                        />
                        <InputText
                          type="text"
                          name="description"
                          placeholder="Description"
                          className="w-100 mt-4"
                          variant="outlined"
                        />

                        <MultipleSelect
                          name="requirements"
                          label="Requirements"
                          options={options1}
                          required
                          multiple
                        />
                        <MultipleSelect
                          name="category"
                          label="Category"
                          options={optionsCategory}
                          required
                        />
                        <MultipleSelect
                          name="mode"
                          label="Mode"
                          options={optionsMode}
                          required
                        />

                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 1,
                            mb: 2,
                          }}
                          type="submit"
                          className="bg-primary py-2 text-white fw-600"
                        >
                          Edit
                        </Button>
                      </Stack>
                    </Form>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="success" onClick={handleDelete}>
            Edit
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default CardOffer;
