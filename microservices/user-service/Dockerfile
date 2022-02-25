FROM golang:alpine

# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64


ENV APP_HOME=/usr/src/temp

# Move to working directory
WORKDIR $APP_HOME

# Copy and download dependency using go mod
COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy the code into the container
COPY . .

# Build the application
RUN go build -o server .

# Move to /usr/src/user-service directory as the place for resulting binary folder
WORKDIR /usr/src/user-service

# Copy binary from build to main folder
RUN cp /usr/src/temp/server .

# Export necessary port
#EXPOSE 3000

# Command to run when starting the container
CMD ["/usr/src/user-service/server"]
