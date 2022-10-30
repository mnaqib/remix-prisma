import {
    type UploadHandler,
    unstable_parseMultipartFormData,
} from '@remix-run/node'
import S3 from 'aws-sdk/clients/s3'
import cuid from 'cuid'

const s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
})

const uploadHandler: UploadHandler = async ({ name, filename, data }) => {
    if (name !== 'profile-pic') return

    const dataArray = []
    let image: Uint8Array = new Uint8Array([])

    for await (const x of data) {
        dataArray.push(x)
    }

    for (let i = 0; i < dataArray.length; i++) {
        image = new Uint8Array([...image, ...dataArray[i]])
    }

    const { Location } = await s3
        .upload({
            Bucket: process.env.AWS_S3_NAME as string,
            Key: `${cuid()}.${filename?.split('.').slice(-1)}`,
            Body: image,
        })
        .promise()

    return Location
}

export async function uploadAvatar(req: Request) {
    const formData = await unstable_parseMultipartFormData(req, uploadHandler)

    const file = formData.get('profile-pic')?.toString() || ''

    return file
}
