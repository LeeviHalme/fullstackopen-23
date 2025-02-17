import { StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";
import theme from "../theme";

import FormikInput from "./FormikInput";
import SubmitButton from "./SubmitButton";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Reporitory owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .integer("Rating must be a number")
    .typeError("Rating must be a number")
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string().optional(),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingTop: 0,
    padding: 15,
  },
});

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormikInput f={formik} name="ownerName" placeholder="Repository owner name" />
      <FormikInput f={formik} name="repositoryName" placeholder="Repository name" />
      <FormikInput isNumeric f={formik} name="rating" placeholder="Rating (0 - 100)" />
      <FormikInput f={formik} name="text" placeholder="Review" />
      <SubmitButton f={formik} text="Create a review" />
    </View>
  );
};

const ReviewContainer = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async values => {
    console.log("Submitted:", values);
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ...values,
            rating: Number(values.rating),
          },
        },
      });

      // navigate to that repository
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (error) {
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => console.error("GraphQL Error:", message));
      }
      if (error.networkError) {
        console.log(error);
        console.log("Detailed network error message:", error.networkError.result.errors);
      }
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default ReviewContainer;
