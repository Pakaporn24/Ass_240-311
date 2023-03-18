import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Tooltip, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import style from "../styles/Contact.module.css";
import axios from "axios";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Home() {
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { data: session } = useSession();

  const [get, setGet] = useState([]);
  const URL = "http://localhost:9000/api";

  useEffect(() => {
    const getGet = async () => {
      const { data: res } = await axios.get(URL);
      setGet(res);
    };
    getGet();
  }, []);

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1>Travel Vibes</h1>
        <nav>
          <ul>
            <Link href="/" className={style.li}>
            แนะนำสถานที่ท่องเที่ยว
            </Link>
            <Link href="/post" className={style.li}>
            เพิ่มสถานที่ท่องเที่ยว
            </Link>
            <Link href="/edit" className={style.li}>
              แก้ไขสถานที่
            </Link>
          </ul>
        </nav>
        {session ? (
          <div>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={session.user.name} src={session.user.image} />
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
              <MenuItem onClick={signOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button color="inherit" onClick={signIn} className={style.Button}>
              Login
            </Button>
          </div>
        )}
      </header>
      <div>
        <img className={style.bghead} src="https://esportivida.com/wp-content/uploads/2020/05/10esportvida1200x500-copya.jpg" alt="background" />
      </div>
      <h2> number of trips : {get.length}</h2>
      <div className={style.container}>
        {get.map((post) => (
          <p key={post.id}>
            <div className={style.test}>
              <img className={style.img} src={post.image} alt={post.name} />
              <div className={style.content}>
                <h2>{post.name}</h2>
                <p className="">{post.description}</p>
              </div>
            </div>
          </p>
        ))}
      </div>
    </div>
  );
}
