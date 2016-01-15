provider "aws" {
  access_key  = "${var.access_key}"
  secret_key  = "${var.secret_key}"
  region      = "${var.region}"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "s3-website-test.mobilecorp.com"
  acl = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

output "website_endpoint" {
  value = "${aws_s3_bucket.bucket.website_endpoint}"
}