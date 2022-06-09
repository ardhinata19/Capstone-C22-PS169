
const mapPredictionsModel = (
    {
        report_id,
        image,
        diseases_title,
        description,
        accuracy,
        createdAt
    }) => ({
    report_id: report_id,
    image: image,
    diseases_title: diseases_title,
    description: description,
    accuracy: accuracy,
    createdAt: createdAt
});

const mapDiseaseModel = (
    {
        id,
        title,
        description,
        imageDiseases,
        createdAt,
        updatedAt
    }) => ({
    id,
    title,
    description,
    imageDiseases: imageDiseases,
    createdAt,
    updatedAt
});

const mapPredictHistoryModel = ({
                                    id,
                                    user_id,
                                    disease_id,
                                    accuracy,
                                    image,
                                    createdAt
                                }) => ({
    id,
    userId: user_id,
    diseaseId: disease_id,
    accuracy,
    image: image,
    createdAt: createdAt
});

//
module.exports = {
    mapDiseaseModel,
    mapPredictionsModel,
    mapPredictHistoryModel
};