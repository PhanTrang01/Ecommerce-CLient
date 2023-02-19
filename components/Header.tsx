import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SavingsIcon from "@mui/icons-material/Savings";
import { UserContext } from "../contexts/UserContext";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContext } from "../contexts/ToastContext";
import Badge from "@mui/material/Badge";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CartContext } from "../contexts/CartContext";
import Chip from "@mui/material/Chip";

const pages = ["Products", "Pricing", "Blog"];

const Header = () => {
  const routes = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);

  const { user, getUser } = useContext(UserContext);
  const { notify } = useContext(ToastContext);
  const { carts, getCarts } = useContext(CartContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  const logout = async () => {
    try {
      const server_host = "http://localhost:8000/api";
      const res = await axios.post(`${server_host}/auth/logout`, undefined, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.success) {
        notify("success", data.message);
        getUser();
        getCarts();
        handleCloseUserMenu();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SavingsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Chat">
                <IconButton
                  onClick={() => routes.push(`/chat`)}
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  sx={{ marginRight: 2 }}
                >
                  <ChatIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="View your card">
                <IconButton
                  onClick={handleOpenCartMenu}
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  sx={{ marginRight: 2 }}
                >
                  <Badge
                    badgeContent={carts.length ? carts.length : undefined}
                    color="error"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.photoURL} />
                </IconButton>
              </Tooltip>
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
                <MenuItem onClick={() => routes.push(`/user/${user.id}`)}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => routes.push(`/product/new`)}>
                  <Typography textAlign="center">Create Product</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-cart"
                anchorEl={anchorElCart}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElCart)}
                onClose={handleCloseCartMenu}
              >
                {carts.map((cart) => (
                  <MenuItem key={cart.id}>
                    <Card sx={{ display: "flex", p: 1 }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography
                            component="div"
                            variant="h5"
                            minWidth={180}
                          >
                            {`${cart.product.pname} x ${cart.quantity}`}
                          </Typography>
                          <Typography
                            component="div"
                            variant="subtitle1"
                            minWidth={180}
                          >
                            {`${cart.product.price}$`}
                          </Typography>
                          <Chip
                            label={`quantity:${cart.quantity}`}
                            color="success"
                          />
                        </CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                          }}
                        ></Box>
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 120 }}
                        image={cart.product.photoURL}
                        alt="cart product"
                      />
                    </Card>
                  </MenuItem>
                ))}
                {carts.length ? (
                  <MenuItem onClick={() => routes.push(`/payments`)}>
                    <Typography textAlign="center" variant="h6" color="primary">
                      <Button variant="contained">View Cart</Button>
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Typography textAlign="center" variant="h6" color="primary">
                      There are no products in the cart
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  routes.push("/login");
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
