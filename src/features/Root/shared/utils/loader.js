import { json } from "react-router-dom";

import { getCurrentUser } from "../../../../shared/services/handlers/auth";
import SessionStorageService from "../../../../shared/storage/sessionStorage";
import { userActions } from "../../../../shared/store/slices/userSlice/userSlice";

export const authState = (dispatch) => async () => {
  try {
    const userSession = SessionStorageService.getStoredData("multimart_user");

    if (userSession) {
      dispatch(userActions.setLog(userSession));
      return userSession;
    } else if (userSession === "") {
      return null;
    }

    const currentUser = await getCurrentUser();
    dispatch(userActions.setLog(currentUser));
    SessionStorageService.saveData("multimart_user", currentUser || "");
    return currentUser;
  } catch (error) {
    throw json(
      { message: "Could not fetch user data." },
      {
        status: 500,
      }
    );
  }
};
