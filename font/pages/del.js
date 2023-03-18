import { useRouter } from "next/router";
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

function del() {
  const router = useRouter();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { data: session } = useSession();

  const [get, setGet] = useState([]);
  const URL = "http://localhost:9000/api/";

  const removeContactHandler = async (id) => {
    await axios.delete(URL + id);
    setGet(null);
    router.push("/");
  };

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
              Home
            </Link>
            <Link href="/post" className={style.li}>
              Add New
            </Link>
            <Link href="/edit" className={style.li}>
              Edit
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

      <h2> number of attractions : {get.length}</h2>
      <div className={style.container}>
        {get.map((post) => (
          <p key={post.id}>
            <div className={style.test}>
              <img className={style.img} src={post.image} alt={post.name} />
              <div className={style.content}>
              <h2>{post._id}</h2>
              <h2>{post.name}</h2>
                <p className="">{post.description}</p>
                <div className={style.set}>
                  <Link className={style.pushupdate} href="/update">
                    Update
                  </Link>
                  <a
                    className={style.pushdel}
                    href="/del"
                    onClick={() => removeContactHandler(post._id)}
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </p>
        ))}
      </div>
    </div>
  );
}

export default del;
