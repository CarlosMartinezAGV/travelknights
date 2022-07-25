import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Svg } from "../map/usaHigh.svg";
import AppBar from "@mui/material/AppBar";
import { useDispatch } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import CancelIcon from "@mui/icons-material/Cancel";
import { addMemory } from '../actions/posts';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
//I plan on creating a confirm for delete, might not if too time crunched.
import CheckIcon from "@mui/icons-material/Check";
const theme = createTheme();
var htmlElement = "../map/usaHigh.svg";

//temp objects before info is sent This is proper format
//Everything involving Trips, most likely needs to be in useEffect.
const Trips = [
  {
    stateAbbrev: "FL",
    cities: [
      {
        city: "Orlando",
        memories: [{ date: "12/12/12", description: "desc.", image: "img" }, { date: "12/12/13", description: "This is my test description cool", image: "img" }],
      },
      {
        city: "Tampa",
        memories: [{ date: "02/10/22", description: "desc.2", image: "img" }],
      },
    ],
  },
  {
    stateAbbrev: "GA",
    cities: [
      {
        city: "Atlanta",
        memories: [{ date: "12/12/02", description: "desc.3", image: "img" }],
      },
    ],
  },
];
var items = [];
var itemsnum = 0;

// We format List of Trips in this function.

export default function Map() {
  //useEffect needed to getElement without NULL result

  useEffect(() => {
    for (var i = 0; i < Trips.length; i++) {
      var STVisited = Trips[i].stateAbbrev;
      STVisited = "US-" + STVisited;
      var STCheck = document.getElementById(STVisited);
      STCheck.setAttribute("class", "visited");
      //Possibly add Trip Table code here.
    }
  }, []);
  function sayHello(el) {
    if (el.id.startsWith("US-")) {
      htmlElement = el.id;
      var ST = htmlElement.substring(htmlElement.length - 2); //We'd actually check the stateabbrev. object, see if we find it, then push all cities from there along with however we want to display memories.
      htmlElement = ST;
      handleClickOpen();
      if (itemsnum != 0) {
        items = [];
        itemsnum = 0;
      }
      for (var i = 0; i < Trips.length; i++) {
        if (Trips[i].stateAbbrev == ST) {
          for (var j = 0; j < Trips[i].cities.length; j++) {
            items.push(Trips[i].cities[j]); //Array of Trips in FL DOESNT WORK YET
            itemsnum++;
          }
        }
      }
    }
  }
//For sending memories to backend, use user.payload.user.states[i].cities[j].memories[k]._id

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //html Element has state
    const newTrip = { date: "", city: "", description: "", stateAbbreviation: "", image: "", userId: ""};
    newTrip.date = data.get("date");
    newTrip.city = data.get("city");
    newTrip.description = data.get("description");
    newTrip.stateAbbreviation = htmlElement;
    newTrip.image = "img";
    newTrip.userId = user.payload.user._id;
    console.log(user);
    console.log(newTrip);
    dispatch(addMemory(newTrip));

  }

  const [open, setOpen] = React.useState(false);
  const [open_editdel, setOpeneditdelete] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const editdeleteOpen = () => {
    setOpeneditdelete(true);
  };

  const editdeleteClose = () => {
    setOpeneditdelete(false);
  };
  const openEditDelete = () => setOpeneditdelete(true);
  const openForm = () => setOpen(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [nav, setnav] = React.useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const navMenu = (event) => {
    setnav(event.currentTarget);
  };

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navclose = () => {
    setnav(null);
  };
  const [openList, setOpenList] = React.useState(false);

  //This styles the modals
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#f8f4e3",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    minWidth: "70%",
    
  };
  const addStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#f8f4e3",
    border: "1px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3  };
  

  function CollapsibleTable2() {
    const [open2, setOpen2] = React.useState(false);
    if (itemsnum != 0) {
      return (
        <div>
          <Grid style={{ display: "flex" }}>
          
          <AddTripModal/>
          </Grid>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow align="left">
                  <TableCell />
                  <TableCell>
                    <b style={{ fontSize: 18 }}>City</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <Row2 key={row.city} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    } else {
      return (
        <h3 style={{ textAlign: "center" }}>
          No Trips Found. Would you like to add one?
        </h3>
      );
    }
  }
  function Row2(props) {
    const { row } = props;
    const [open2, setOpen2] = React.useState(false);
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen2(!open2)}
            >
              {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.city}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Memories:
                </Typography>
                <Table size="small" aria-label="Memories">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="center">Description:</TableCell>
                      <TableCell align="center">Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                 
                  {row.memories.map((row) => (
                  <Row3 key={row.date} row={row} />))}



                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  function Row3(props) {
    const { row } = props;
    const [edit, setEdit] = React.useState(false);
    const [deleteRow, setDelete] = React.useState(false);
return (
  <TableRow key={row.date}>
  <TableCell component="th" scope="row">
    {row.date}
  </TableCell>
  <TableCell align="center">
    {row.description}
  </TableCell>
  <TableCell align="center">{row.image}</TableCell>
<TableCell align="right">
<IconButton
aria-label="edit row"
size="small"
onClick={() => setEdit(!edit)} >
{edit ? <CheckIcon/> : <EditIcon/>}
</IconButton>

<IconButton
aria-label="delete row"
size="small"
onClick={() => setDelete(!deleteRow)} >
{deleteRow ? <DeleteIcon/> : <DeleteOutlineIcon/>}
</IconButton>
</TableCell>
</TableRow>
);

  }
  function AddTripModal() {
    //Goal is to return userId, State, city, date, desc, image.
    //ID + State are set, image will use temp for now
    const [month,setMonth] = useState("Jan.");
    const [open2, setOpen2] = React.useState(false);

     const handleChange = (event) => {
      setMonth(event.target.value)
    }
    const handleOpen2 = () => {
      setOpen2(true);
    };
    const handleClose2 = () => {
      setOpen2(false);
    }
    return(<React.Fragment>
    <Button
    onClick={handleOpen2}
    startIcon={<AddIcon />}
    style={{
      marginLeft: "auto",
      color: "#F8F4E3",
      backgroundColor: "#65743A",
    }}
  >
    Add Memory
  </Button>
  <Modal
  hideBackdrop
  open={open2}
  onClose={handleClose2}
  aria-labelledby="Add Trip"
  aria-describedby="Add Trip Form">
    <Fade in={open2}>
    <Box
              sx={{ ...addStyle, width: '300px', '& > :not(style)': { m: 1 } }}
              component='form'
              onSubmit={handleSubmit}
            >
               <Typography style={{fontSize: 18}} align='center'>
               <b>Add Memory to {htmlElement}</b>
              </Typography>
              <Stack direction='column' justifyContent='center'>
                <Input
                  placeholder='City Name:'
                  id='city'
                  name='city'
                  startAdornment={
                    <InputAdornment position='start'>
                      <AddLocationIcon />
                    </InputAdornment>
                  }
                ></Input>
                <TextField
                  placeholder='Description:'
                  id='standard-multiline-flexible'
                  multiline
                  name='description'
                  maxRows={4}
                  onChange={handleChange}
                  variant='standard'
                  inputProps={{
                    maxLength: 145,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <StickyNote2Icon />
                      </InputAdornment>
                    ),
                  }}
                />{' '}
              </Stack>

              <Input type='date' id='date'></Input>
              <Stack direction='row' spacing={1.5} justifyContent='center'>
                <Button
                  type='submit'
                  style={{ color: '#F8F4E3', backgroundColor: '#65743A' }}
                >
                  Submit
                </Button>
                <Button onClick={handleClose2} style={{ color: '#65743A' }}>
                  Cancel
                </Button>
              </Stack>
            </Box>
    </Fade>
  </Modal>
  </React.Fragment> );
  }

  return (
    <div>
      <Box onClick={(element) => sayHello(element.target)}>
        <AppBar position="sticky">
          <Toolbar sx={{ backgroundColor: "#65743a" }}>
            <AccountCircle sx={{ fontSize: 21, m: 0.4 }} />
            <Typography component="div" sx={{ fontSize: 15 }}>
              {user.payload.user.name}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ textAlign: "center" }}
            >
              Travel Knights
            </Typography>

            <Button
              color="inherit"
              sx={{ textTransform: "none" }}
              onClick={handleOpenUserMenu}
            >
              <MenuIcon />
            </Button>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={Logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Svg />

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Grid sx={style}>
              <Typography
                sx={{ mb: 2 }}
                textAlign="center"
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Here are your trips from {htmlElement}!
              </Typography>

              <CollapsibleTable2 />
            </Grid>
          </Fade>
        </Modal>
      </Box>
    </div>
  );
}
