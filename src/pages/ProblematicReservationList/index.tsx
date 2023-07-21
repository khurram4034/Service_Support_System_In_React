import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { GridPaginationModel } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
function ProblematicReservationListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    count: 10,
    totalSize: 99,
  });
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (user?.token) {
        try {
          let res = await axios.post(
            "https://wosh-test.herokuapp.com/api/service/getProblematicReservations",
            {
              startIndex: pagination.startIndex,
              count: pagination.count,
            }
            // {
            //   headers: {
            //     Authorization: `Bearer ${user?.token}`,
            //   },
            // }
          );
          if (res.data) {
            setData(res.data);
          }
        } catch (error) {
          // alert(error.message);
        }
        setLoading(false);
      }
    })();
  }, [user, pagination]);
  type assignedPartnersType = {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    stars: number;
  };
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));
  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ID",
      sortable: false,
      minWidth: 100,
      renderCell: (data) => (
        <>
          <Link
            style={{ textDecoration: "none", color:"black", cursor:"pointer" }}
            to={`/reservation/${data.row.id}`}
            state={{data: data.row}}
          >
            #{data.row.id.slice(0, 5)}
          </Link>
        </>
      ),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.arrivalTimeFrom} - ${params.row.arrivalTimeTo}`,
    },

    {
      field: "Customer",
      headerName: "Customer",
      sortable: false,
      minWidth: 250,
      renderCell: (data) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={data.row.customer.name} src={data.row.customer.image} />
          <div style={{ marginLeft: "10px" }}>
            <Typography variant="subtitle1">
              {data.row.customer.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.row.customer.email}
            </Typography>
          </div>
        </div>
      ),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.taskObject.nickName}`,
    },
    {
      field: "assignedPartners",
      headerName: "Assigned Partners",
      sortable: false,
      minWidth: 180,
      renderCell: (data) => (
        <AvatarGroup max={4}>
          {data.row.assignedPartners.map((partner: assignedPartnersType) => (
            <HtmlTooltip
              placement="right-start"
              title={
                <React.Fragment>
                  <div style={{ display: "flex", alignItems: "start" }}>
                    <Avatar alt={partner.name} src={partner.photoUrl} />
                    <div style={{ marginLeft: "10px" }}>
                      <Typography variant="subtitle1">
                        {partner.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ paddingBottom: "5px" }}
                      >
                        {partner.email}
                      </Typography>
                      <Divider />
                      <Rating
                        name="read-only"
                        value={partner.stars}
                        readOnly
                        style={{ padding: "5px 0px" }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              }
            >
              <Avatar alt={partner.name} src={partner.photoUrl} />
            </HtmlTooltip>
          ))}
        </AvatarGroup>
      ),
    },

    {
      field: "ArrivalDuration",
      headerName: "Arrival Duration",
      sortable: false,
      minWidth: 180,
      renderCell: (data) => (
        <>
          {new Date(data.row.arrivalTimeFrom).toLocaleDateString()}{" "}
          <ArrowForwardIosIcon
            fontSize={"inherit"}
            style={{ margin: "0px 5px" }}
          />{" "}
          {new Date(data.row.arrivalTimeTo).toLocaleDateString()}
        </>
      ),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.arrivalTimeFrom} - ${params.row.arrivalTimeTo}`,
    },
    {
      field: "isPendingPayment",
      headerName: "Pending Payment",
      sortable: false,
      minWidth: 150,
      renderCell: (data) => (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {data.row.isPendingPayment ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
        </div>
      ),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.arrivalTimeFrom} - ${params.row.arrivalTimeTo}`,
    },
    {
      field: "isTimePassedChecked",
      headerName: "Time Passed",
      sortable: false,
      minWidth: 100,
      renderCell: (data) => (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {data.row.isTimePassedChecked ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
        </div>
      ),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.arrivalTimeFrom} - ${params.row.arrivalTimeTo}`,
    },
  ];

  const rows = [
    {
      id: "61ae19e8-aa95-49ef-995a-1c096ddb28df",
      latitude: -541.52,
      longitude: -3873.235,
      arrivalTimeFrom: "2023-07-16T09:15:46.021204Z",
      arrivalTimeTo: "2023-07-17T08:07:23.021206Z",
      reservationPaymentToken: "PAYMENT_Token_374",
      isTimePassedChecked: true,
      isPartnerResponseTimePassedChecked: true,
      isPendingPayment: false,
      lastPartnerAssignTime: "2023-07-16T03:46:21.021244Z",
      taskObject: {
        id: "ad2367b7-4412-488a-9dbd-71ffbe32bbd5",
        nickName: "Mini",
        year: "1994",
        plateNumber: "JKN-426",
        type: "Sedan",
        image: "https://stimg.cardekho.com/images",
      },
      feedback: {
        id: "192d9273-55d2-433d-8795-9a2dd0230c5a",
        message: "The car was still dirty after the wash.",
        feedbackType: "WORK_IS_NOT_FINISHED",
        feedbackStars: "ZERO_STARS",
      },
      reservationEvents: [
        {
          id: "8e42f183-0c3b-4372-92d2-e9a0e2f8aa2a",
          partnerId: "664cf6ad-2cad-406a-8fdf-5ad6231f07c4",
          customerId: "de1eb63b-c1bd-47f2-9dd0-fc4fbb181441",
          reservationStatus: "INITIALIZED",
          statusColor: "#FFD800",
          statusText: "Pending payment",
          statusExtraText: null,
          logTime: "2023-07-16T03:46:21.028926Z",
        },
        {
          id: "6139921b-193a-4fc3-871f-f19fa5fe8d02",
          partnerId: "664cf6ad-2cad-406a-8fdf-5ad6231f07c4",
          customerId: "de1eb63b-c1bd-47f2-9dd0-fc4fbb181441",
          reservationStatus: "WAITING_FOR_PARTNER_CONFIRMATION",
          statusColor: "#FFD800",
          statusText: "Waiting for washer confirmation",
          statusExtraText: null,
          logTime: "2023-07-16T03:46:21.050695Z",
        },
        {
          id: "8c90db0b-1b87-4d6e-bb9f-fe9c3ba6cd4f",
          partnerId: "664cf6ad-2cad-406a-8fdf-5ad6231f07c4",
          customerId: "de1eb63b-c1bd-47f2-9dd0-fc4fbb181441",
          reservationStatus: "CONFIRMED_BY_PARTNER",
          statusColor: "#0026FF",
          statusText: "Confirmed by washer",
          statusExtraText: null,
          logTime: "2023-07-16T03:46:21.065658Z",
        },
        {
          id: "ee061482-b09c-449f-af32-ac0eef6ec907",
          partnerId: "664cf6ad-2cad-406a-8fdf-5ad6231f07c4",
          customerId: "de1eb63b-c1bd-47f2-9dd0-fc4fbb181441",
          reservationStatus: "DONE",
          statusColor: "#02FD24",
          statusText: "Done",
          statusExtraText: null,
          logTime: "2023-07-16T03:46:21.082369Z",
        },
        {
          id: "76b9d82d-d4c4-4503-ba00-7b7ee82fbaa0",
          partnerId: "664cf6ad-2cad-406a-8fdf-5ad6231f07c4",
          customerId: "de1eb63b-c1bd-47f2-9dd0-fc4fbb181441",
          reservationStatus: "CUSTOMER_FEEDBACK",
          statusColor: "#02FD24",
          statusText: "Got feedback from customer",
          statusExtraText: null,
          logTime: "2023-07-16T03:46:21.098221Z",
        },
      ],
      customer: {
        id: "de1eb63b-c1bd-47f2-9dd0-fc4fbb181441",
        name: "mia taylor",
        email: "mia.taylor@gmail.com",
        photoUrl: "url",
        utcTimeZoneOffset: "Z",
      },
      assignedPartners: [
        {
          id: "664cf6ad-2cad-406a-8fdf-5ad6231f07c4",
          name: "olivia jones",
          email: "olivia.jones@gmail.com",
          photoUrl: "http://url40",
          homeLatitude: 50.1227687072745,
          homeLongitude: 68.94676909540405,
          utcTimeZoneOffset: "Z",
          price: 70.0,
          currency: "ILS",
          stars: 3.6093032,
          reviews: 73,
        },
      ],
    },
  ];

  const handlePageChange = (data: GridPaginationModel) => {
    setLoading(true);
    setPagination((state) => ({ ...state, startIndex: data.page }));
  };
  return (
    <div>
      <h2>Problematic Reservations</h2>
      <div style={{ height: "100%", width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          loading={loading}
          // pageSizeOptions={[5]}
          rowCount={pagination.totalSize}
          paginationModel={{
            page: pagination.startIndex,
            pageSize: pagination.count,
          }}
          paginationMode="server"
          onPaginationModelChange={handlePageChange}
          disableRowSelectionOnClick
          // initialState={{
          //   pagination: {

          //     paginationModel: { page: 0, pageSize: 10 },
          //   },
          // }}

          // pageSizeOptions={[2, 5, 10]}
        />
      </div>
    </div>
  );
}

export default ProblematicReservationListPage;
