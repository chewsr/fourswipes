#!/bin/bash -eu

export VERSION=$BUILDKITE_BUILD_NUMBER

name_version="carshare-${VERSION}"
archive_filename="${name_version}.tar.gz"
payload_filename="${name_version}.js"
tempdir="/tmp/$name_version"
s3_dest="s3://${DEPLOY_BUCKET}/carshare/${payload_filename}"

heading() {
  echo ""
  echo -e "\033[7m-- $1 --\033[27m"
  echo ""
}

archive_to_tmp() {
  heading "Archive to $tempdir"
  git archive HEAD --format=tar.gz --output=$archive_filename

  mkdir $tempdir
  tar xzf $archive_filename -C $tempdir
}

jspm_bundle() {
  heading "JSPM bundle"
  npm install && jspm install && gulp bundle
}

publish_to_s3() {
  heading "Publish to $s3_dest"
  aws s3 cp --region ap-southeast-2 dist/$payload_filename $s3_dest
}

cleanup() {
  heading "Cleanup"
  rm -rf $tempdir
  rm -f  $archive_filename
}

archive_to_tmp
pushd $tempdir
jspm_bundle
publish_to_s3
popd
cleanup
