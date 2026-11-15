#!/usr/bin/env bash
# Refreshes src/contrib.json: one contribution calendar per year, 2023 to this year. Needs an authenticated gh.
set -euo pipefail
q='query($from:DateTime!,$to:DateTime!){viewer{contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{contributionCount}}}}}}'
for y in $(seq 2023 "$(date +%Y)"); do
  to="$y-12-31T23:59:59Z"; [ "$y" = "$(date +%Y)" ] && to="$(date -u +%FT%TZ)"
  gh api graphql -f query="$q" -f from="$y-01-01T00:00:00Z" -f to="$to" \
    --jq "{key:\"$y\",value:(.data.viewer.contributionsCollection.contributionCalendar|{total:.totalContributions,weeks:[.weeks[]|[.contributionDays[].contributionCount]]})}"
done | jq -sc '{years:from_entries}' > src/contrib.json
