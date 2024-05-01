import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

interface FormValues {
    walletAddress: string;
}
interface AddressInputCardProps {
    onGetData: (walletAddress: string) => void
}
export const AddressInputCard = ({ onGetData }: AddressInputCardProps) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
        mode: 'onChange'
    });

    const onSubmit = (data: { walletAddress: string }) => {
        onGetData(data.walletAddress);
    };
    return (
        <Card className="py-4" fullWidth>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Add Ethereum Mainnet Address below</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        fullWidth
                        type="text"
                        label="Wallet Address"
                        placeholder="0x..."
                        defaultValue="0x70085C396A42197Bf77dDa28487682837DE1aDA0"
                        description="Address of the wallet to get data for"
                        variant="bordered"
                        {...register("walletAddress", {
                            required: "Wallet address is required",
                            pattern: {
                                value: /^(0x[a-fA-F0-9]{40})$/,
                                message: "Invalid Ethereum wallet address"
                            }
                        })}
                        isInvalid={!!errors.walletAddress}
                        errorMessage="Invalid Ethereum wallet address"
                        className="my-4"
                    />
                    <Button
                        variant="solid"
                        color="primary"
                        isDisabled={!isValid}
                        type="submit"
                        fullWidth
                    >
                        Get Data
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
export default AddressInputCard


