export const useValidationErrorsForm = ({error}) => {
    if (error.graphQLErrors)
        return error.graphQLErrors[0].extensions.validation;

    return {}
}