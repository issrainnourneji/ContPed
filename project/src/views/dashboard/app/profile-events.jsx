import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

//profile-header
import ProfileHeader from "../../../components/profile-header";

import CardOffer from "../../../components/card/CardOffer";
import axiosInstance from "../../../utils/axiosInstance";
import { addOffer, editOffer, getOwnOffers } from "../../../api/offer";
import MultipleSelect from "../../../components/Select";

import { Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Stack } from "@mui/material";
import { Modal } from "react-bootstrap";
import InputText from "../../../components/InputText";
import { addOfferSchema } from "../../../schemas/offer.shema";

const ProfileEvents = () => {
  const initialValues = {
    name: "",
    description: "",
    requirements: [],
    category: "",
    mode: "",
  };

  const [offers, setOffers] = useState();
  const [showAdd, setShowAdd] = useState(false);

  const [filterMode, setFilterMode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const getOffers = async () => {
    console.log(filterMode);
    let offerFiltered;
    try {
      const response = await getOwnOffers();
      if (filterMode === "" || filterMode === "all") {
        setOffers(response.data);
      } else {
        offerFiltered = response.data.filter((offer) => {
          return offer.mode === filterMode;
        });
      }
      if (filterCategory === "" || filterCategory === "all") {
        setOffers(response.data);
      } else {
        offerFiltered = response.data.filter((offer) => {
          return offer.category === filterCategory;
        });
      }
      setOffers(offerFiltered);
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const handleAll = async () => {
    const response = await getOwnOffers();
    setOffers(response.data);
  };

  const handleFilterMode = (mode) => {
    setFilterMode(mode);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  useEffect(() => {
    getOffers();
  }, [filterMode, filterCategory]);

  const options = [
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
    <>
      <ProfileHeader />
      <div id="content-page" className="content-page">
        <Container>
          <div className="">
            <div
              style={{
                height: "10px",
                marginTop: "5rem",
                marginBottom: "3rem",
              }}
              className="d-flex flex-row align-items-center justify-content-between mb-5"
            >
              <h1 className=" " style={{ fontWeight: "bold" }}>
                Job Offers:
              </h1>
              <div className="d-flex gap-3">
                <Button onClick={() => handleAll()}>All Offers</Button>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown">
                    {filterCategory === "" || filterCategory === "all"
                      ? "Category"
                      : filterCategory}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        handleFilterMode("");
                        handleFilterCategory("fullTime");
                      }}
                    >
                      FullTime
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        handleFilterMode("");
                        handleFilterCategory("partTime");
                      }}
                    >
                      PartTime
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        handleFilterMode("");
                        handleFilterCategory("internship");
                      }}
                    >
                      Internship
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {filterMode === "" || filterMode === "all"
                      ? "Mode"
                      : filterMode}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        handleFilterCategory("");
                        handleFilterMode("local");
                      }}
                    >
                      Local
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        handleFilterCategory("");
                        handleFilterMode("remote");
                      }}
                    >
                      Remote
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button onClick={() => handleShowAdd()}>Add Offer</Button>
              </div>
            </div>
            <div className="d-flex flex-row flex-wrap gap-5">
              {offers &&
                offers.map((offer) => (
                  <CardOffer
                    id={offer._id}
                    name={offer.name}
                    description={offer.description}
                    category={offer.category}
                    requirements={offer.requirements}
                    publishedDate={offer.publishedDate}
                    owner={offer.owner}
                    mode={offer.mode}
                    offers={() => getOffers()}
                  />
                ))}

              <Modal
                style={{ marginTop: "5rem" }}
                show={showAdd}
                onHide={handleCloseAdd}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={async (
                      values,
                      { errors, setErrors, setSubmitting }
                    ) => {
                      console.log(values);
                      try {
                        const response = await addOffer(values);
                        console.log(response);
                        handleCloseAdd();
                        getOffers();
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
                                  options={options}
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
                                {/* <InputText
                                  type="text"
                                  name="category"
                                  placeholder="Category"
                                  className="w-100 mt-4"
                                  variant="outlined"
                                />

                                <InputText
                                  type="text"
                                  name="mode"
                                  placeholder="Mode"
                                  variant="outlined"
                                /> */}

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
                                  Add
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
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProfileEvents;
