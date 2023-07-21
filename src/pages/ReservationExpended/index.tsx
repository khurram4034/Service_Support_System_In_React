import { Grid, Box, Divider, Button } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CustomizedTimeline from "./Timeline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import axios from "axios";

import { useAuth } from "../../hooks/useAuth";
function ReservationExpendedPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // let [data, setData] = useState({});
  // let
  let { state } = useLocation();
  console.log(state);
  // useEffect(() => {
  //   if (state.data) {
  //     setData(state.data);
  //   }
  // }, [state]);
  useLayoutEffect(() => {
    if (!user?.token) {
      navigate("/login");
    }
  }, [user]);
  const handleApprove = (e: React.MouseEvent) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Sdas");
        try {
          let response = await axios.post(
            "https://wosh-test.herokuapp.com/api/service/resolveProblematicReservation",
            {
              reservationId: state?.data?.id,
              status: "RESOLVED",
              serviceTeamUserId: "4c61a0a9-7a18-4c1d-b2f7-3f8a4f1f16c9",
              message:
                "The issue was resolved by contacting the customer and offering a discount.",
            }
          );
          if (response.data) {
            Swal.fire(
              "Resolved!",
              "This Reservation Problem is resolved",
              "success"
            );
          } else {
            Swal.fire("Error!", "Something went wrong. Try again", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong. Try again", "error");
        }
      }
    });
  };
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid container item md={12} sm={12}>
        <Box
          sx={{
            width: "100%",
            boxShadow: 2,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1>{state?.data?.taskObject?.nickName}</h1>
              <h4>{state?.data?.taskObject?.plateNumber}</h4>
            </div>
            <div>
              <div style={{ marginRight: "10px" }}>
                <h2>Task Information</h2>
                <Divider />
                <h4>Type: {state?.data?.taskObject?.type}</h4>
                <h4>year: {state?.data?.taskObject?.year}</h4>
              </div>
            </div>
          </div>
        </Box>
      </Grid>
      <Grid item md={8} sm={12}>
        <Grid container columnSpacing={2} md={12}>
          <Grid item md={6} sm={12}>
            <Box
              sx={{
                width: "100%",
                boxShadow: 2,
                bgcolor: "background.paper",
                borderRadius: 2,
                p: 2,
              }}
            >
              <div>
                <div style={{ textAlign: "center" }}>
                  <h2>Customer</h2>
                </div>
                <Divider />
                <div>
                  <p>Name: {state?.data?.customer?.name}</p>
                  <p>Email: {state?.data?.customer?.email}</p>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item md={6} sm={12}>
            <Box
              sx={{
                width: "100%",
                boxShadow: 2,
                bgcolor: "background.paper",
                borderRadius: 2,
                p: 2,
              }}
            >
              <div>
                <div style={{ textAlign: "center" }}>
                  <h2>Partner</h2>
                </div>

                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p>Name: {state?.data?.assignedPartners[0]?.name}</p>
                    <p>Email: {state?.data?.assignedPartners[0]?.email}</p>
                  </div>
                  <Rating
                    name="read-only"
                    value={state?.data?.assignedPartners[0]?.stars}
                    readOnly
                    style={{ padding: "10px 0px" }}
                  />
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item md={12} sm={12}>
            <h2>Status</h2>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <StatusWrapper
                statusName={"Pending Payment"}
                value={state?.data?.isPendingPayment}
              />
              <StatusWrapper
                statusName={"Time Passed Checked"}
                value={state?.data?.isTimePassedChecked}
              />
              <StatusWrapper
                statusName={"Partner Response Time Checked"}
                value={state?.data?.isPartnerResponseTimePassedChecked}
              />
            </div>
            <Button onClick={(e) => handleApprove(e)}>Approve</Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={4} sm={12}>
        <Box
          sx={{
            width: "100%",
            boxShadow: 2,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
          }}
        >
          <div>
            <div style={{ textAlign: "center" }}>
              <h2>Reservation Log</h2>
            </div>
            <Divider />
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <CustomizedTimeline
                reservation={
                  state?.data?.reservationEvents
                    ? state?.data?.reservationEvents
                    : []
                }
              />
            </div>
          </div>
        </Box>
      </Grid>
      <Grid item md={12} sm={12}></Grid>
    </Grid>
  );
}

export default ReservationExpendedPage;

const StatusWrapper = (props: any) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "10px 5px",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      {props.value ? (
        <CheckCircleIcon color="success" />
      ) : (
        <CancelIcon color="error" />
      )}
      <small>{props.statusName}</small>
    </div>
  );
};
