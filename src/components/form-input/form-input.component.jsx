import "./form-input.styles.jsx";
import { Group, Input, FormInputLabel } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && <FormInputLabel>{label}</FormInputLabel>}
    </Group>
  );
};

export default FormInput;
