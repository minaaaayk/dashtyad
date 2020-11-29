import { WebAppThunk } from "../../../stores";
import { notebooksInit } from "..";
import { notebooksFailed } from "../notebooks";

export const DeleteOneNoteBook = (variables: string): WebAppThunk => async (
  dispatch
) => {
  try {
    dispatch(notebooksInit("delete"));

    //query
    // dispatch(deleteNotebookSuccess(item));
  } catch (err) {
    dispatch(notebooksFailed({ type: "delete", message: err.toString() }));
  }
};
