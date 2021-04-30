import { FormStore, required } from "../Form";

export const getVenueForm = (self) => {
    return new FormStore({
        fields: {
            name: {
                type: String,
                validators: [required()],
            },
            location: {
                type: String,
                validators: [required()],
            },
            color: {
                type: String,
                validators: [required()],
            },
            time: {
                type: String,
                validators: [required()],
            },
            interval: {
                type: String,
                validators: [required()],
            },
            rooms: {
                type: Object,
            },
        },
        async onSubmit() {
            await self.submitEditVenue();
        },
    });
};
