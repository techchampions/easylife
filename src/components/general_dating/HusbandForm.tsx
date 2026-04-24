import InputField from "../form/InputField";

const HusbandForm = () => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-2">
        <InputField
          label="Things i like about my Wife"
          name="about_wife_positive"
          type="textarea"
          placeholder="Please indicate if here."
          rows={2}
          className=""
        />
        <InputField
          label="Things i don't like about my Wife"
          name="about_wife_negative"
          type="textarea"
          placeholder="Please indicate if here."
          rows={2}
          className=""
        />
      </div>
      <InputField
        label="Changes and adjustments i would like my Wife to make"
        name="changes_to_wife"
        type="textarea"
        placeholder="Please indicate if here."
        className=""
      />
    </div>
  );
};

export default HusbandForm;
