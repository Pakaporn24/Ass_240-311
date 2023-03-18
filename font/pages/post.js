import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import * as React from "react";
import style from "../styles/Contact.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Tooltip, Menu, MenuItem } from "@mui/material";

function post() {
  const [post, setPosts] = useState({ name: "", image: "", description:"" });
  const URL = "http://localhost:9000/api";
  const { data: session } = useSession();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //   useEffect(() => {
  //     const getPost = async () => {
  //       const { data: res } = await axios.get(URL);
  //       setPosts(res);
  //     };
  //     getPost();
  //   }, []);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const router = useRouter();
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(URL, post)
      .then((res) => {
        alert("Data Added Successfully!");
        router.push("/");
      })
      .catch((err) => console.log(err));
  }

  const addPost = async () => {
    const post = { name: "", image: "", description:"" };
    await axios.post(URL, post);
    setPost([post, ...post]);
  };

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
      <form className={style.box}>
        <h1>เพิ่มสถานที่ท่องเที่ยว</h1>
        <br/>
        <input
          className={style.text}
          placeholder="ชื่อสถานที่"
          type="text"
          id="fname"
          name="fname"
          onChange={(e) => setPosts({ ...post, name: e.target.value })}
        ></input>
        <br />
        <input
          className={style.text}
          placeholder="รูปภาพใส่เป็น link "
          type="text"
          id="lname"
          name="lname"
          onChange={(e) => setPosts({ ...post, image: e.target.value })}
        ></input>
        <br />
        <input
          className={style.text}
          placeholder="คำอธิบาย "
          type="text"
          id="lname"
          name="lname"
          onChange={(e) => setPosts({ ...post, description: e.target.value })}
        ></input>
        <br />
        <input className={style.submit} onClick={handleSubmit} type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default post;
