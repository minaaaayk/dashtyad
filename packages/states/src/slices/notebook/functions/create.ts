import { WebAppThunk } from "../../../stores";
import { notebooksInit } from "..";
import { notebooksFailed } from "../notebooks";

export const CreateOneNoteBook = (variables: string): WebAppThunk => async (
  dispatch
) => {
  try {
    dispatch(notebooksInit("create"));

    //query
    // const item = [];
    // dispatch(createNotebookSuccess(item));
  } catch (err) {
    dispatch(notebooksFailed({ type: "create", message: err.toString() }));
  }
};
