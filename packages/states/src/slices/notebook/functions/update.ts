import { WebAppThunk } from "../../../stores";
import { notebooksFailed, notebooksInit } from "../notebooks";

export const UpdateOneNoteBook = (variables: string): WebAppThunk => async (
  dispatch
) => {
  try {
    dispatch(notebooksInit("update"));

    // dispatch(updateNotebookSuccess(item));
  } catch (err) {
    dispatch(notebooksFailed({ type: "update", message: err.toString() }));
  }
};
