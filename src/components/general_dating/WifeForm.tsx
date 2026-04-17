import InputField from "../form/InputField";

const WifeForm = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <div className="">What are the things you like about your Husband</div>
        <InputField
          name="aboutSpousePositive"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
      </div>
      <div className="space-y-1">
        <div className="">
          What are the things you don't like about your Husband
        </div>
        <InputField
          name="aboutSpouse"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
      </div>
      <div className="space-y-1">
        <div className="">
          What changes and adjustments would you like your Husband to do
        </div>
        <InputField
          name="changesToSpouse"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
      </div>
      <div className="space-y-1">
        <div className="">
          Are there other things about the marriage you may wish the counseling
          team to know?{" "}
        </div>
        <InputField
          name="other_issues"
          type="textarea"
          placeholder="Please indicate if here."
          className=""
        />
      </div>
    </div>
  );
};

export default WifeForm;
