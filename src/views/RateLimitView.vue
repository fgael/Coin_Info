<template>
  <v-container class="fill-height align-start" fluid>
    <v-row>
      <v-col cols="12">
        <v-btn
          class="my-2"
          variant="plain"
          prepend-icon="mdi-chevron-left"
          to="/"
        >
          Back
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        style="height: 70vh"
      >
        <div class="d-flex flex-column justify-center align-center text-grey">
          <h1>Rate Limit Notice</h1>
          <div>
            <p class="mt-8 text-center">
              We are currently using the free plan of the CoinGecko API, which
              has rate limits. If you are seeing this message, it means that we
              have exceeded the allowed number of requests within a certain
              timeframe.
            </p>
            <p class="mt-5 text-center">
              Please bear with us while waiting for the rate limit to reset.
              Thank you for your understanding.
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
