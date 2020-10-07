import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
// import InboxIcon from "material-ui-icons/MoveToInbox";
// import DraftsIcon from "material-ui-icons/Drafts";
// import StarIcon from "material-ui-icons/Star";
// import SendIcon from "material-ui-icons/Send";
// import MailIcon from "material-ui-icons/Mail";
// import DeleteIcon from "material-ui-icons/Delete";
// import ReportIcon from "material-ui-icons/Report";

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemText primary="Inbox" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemText primary="All mail" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Trash" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Spam" />
    </ListItem>
  </div>
);
