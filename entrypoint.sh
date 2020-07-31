set -e

ls -l
node --version

# GITHUB_TOKEN=$1
# REPOSITORY=$2
# VERSION=$3
# COMMITISH=$4
# NAME=$5
# BODY=$6
# DRAFT=$7
# PRERELEASE=$8

# npx lerna publish from-package --yes

# curl -s -X POST https://api.github.com/repos/$REPOSITORY/releases \
# -H "Authorization: token $GITHUB_TOKEN" \
# -d @- <<EOF
# {
#   "tag_name": "$VERSION",
#   "target_commitish": "$COMMITISH",
#   "name": "$NAME",
#   "body": "$BODY",
#   "draft": $DRAFT,
#   "prelease": $PRERELEASE
# }
# EOF
