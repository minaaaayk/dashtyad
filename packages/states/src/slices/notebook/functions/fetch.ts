import { WebAppThunk } from "../../../stores";
import { notebooksInit } from "..";
import { notebooksFailed } from "../notebooks";

export const fetchAllNoteBooks = (variables: string): WebAppThunk => async (
  dispatch
) => {
  try {
    dispatch(notebooksInit("get"));

    // query

    // dispatch(getNotebooksSuccess(items));
  } catch (err) {
    dispatch(notebooksFailed({ type: "get", message: err.toString() }));
  }
};
