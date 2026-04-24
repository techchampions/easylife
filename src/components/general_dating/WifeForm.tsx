import InputField from "../form/InputField";

const WifeForm = () => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-2">
        <InputField
          label="Things i like about my Husband"
          name="aboutSpousePositive"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
        <InputField
          label="Things i dislike in my Husband"
          name="aboutSpouse"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
      </div>
      <InputField
        label="Changes and adjustments i would like my Husband to make"
        name="changesToSpouse"
        type="textarea"
        placeholder="Please indicate if here."
        className=""
      />
    </div>
  );
};

export default WifeForm;
