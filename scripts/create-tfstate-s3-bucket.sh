#!/bin/sh

bucket_name='crgeary-alpha-terraform-state'
bucket_region='eu-west-2'

## --

aws s3api head-bucket \
    --bucket $bucket_name \
    > /dev/null 2>&1

if [[ ${?} -eq 0 ]]; then
    echo "Error: Bucket [$bucket_name] already exists" 2>&1 
    exit 1
fi

echo "Creating bucket [$bucket_name]"
aws s3api create-bucket \
    --bucket $bucket_name \
    --create-bucket-configuration LocationConstraint=$bucket_region

echo "Enabling versioning for bucket"
aws s3api put-bucket-versioning \
    --bucket $bucket_name \
    --versioning-configuration Status=Enabled

echo "Enabling encryption for bucket"
aws s3api put-bucket-encryption \
    --bucket $bucket_name \
    --server-side-encryption-configuration '{
        "Rules": [{
            "ApplyServerSideEncryptionByDefault": {
                "SSEAlgorithm": "AES256"
            }
        }]
    }'

echo "Blocking public access to bucket"
aws s3api put-public-access-block \
    --bucket $bucket_name \
    --public-access-block-configuration "BlockPublicAcls=true, IgnorePublicAcls=true, BlockPublicPolicy=true, RestrictPublicBuckets=true"
