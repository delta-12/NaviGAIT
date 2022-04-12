import cv2
import os
import math

# define names of each possible ArUco tag OpenCV supports
ARUCO_DICT = {
    "DICT_4X4_50": cv2.aruco.DICT_4X4_50,
    "DICT_4X4_100": cv2.aruco.DICT_4X4_100,
    "DICT_4X4_250": cv2.aruco.DICT_4X4_250,
    "DICT_4X4_1000": cv2.aruco.DICT_4X4_1000,
    "DICT_5X5_50": cv2.aruco.DICT_5X5_50,
    "DICT_5X5_100": cv2.aruco.DICT_5X5_100,
    "DICT_5X5_250": cv2.aruco.DICT_5X5_250,
    "DICT_5X5_1000": cv2.aruco.DICT_5X5_1000,
    "DICT_6X6_50": cv2.aruco.DICT_6X6_50,
    "DICT_6X6_100": cv2.aruco.DICT_6X6_100,
    "DICT_6X6_250": cv2.aruco.DICT_6X6_250,
    "DICT_6X6_1000": cv2.aruco.DICT_6X6_1000,
    "DICT_7X7_50": cv2.aruco.DICT_7X7_50,
    "DICT_7X7_100": cv2.aruco.DICT_7X7_100,
    "DICT_7X7_250": cv2.aruco.DICT_7X7_250,
    "DICT_7X7_1000": cv2.aruco.DICT_7X7_1000,
    "DICT_ARUCO_ORIGINAL": cv2.aruco.DICT_ARUCO_ORIGINAL,
    "DICT_APRILTAG_16h5": cv2.aruco.DICT_APRILTAG_16h5,
    "DICT_APRILTAG_25h9": cv2.aruco.DICT_APRILTAG_25h9,
    "DICT_APRILTAG_36h10": cv2.aruco.DICT_APRILTAG_36h10,
    "DICT_APRILTAG_36h11": cv2.aruco.DICT_APRILTAG_36h11
}


# verify that the supplied ArUCo tag exists and is supported by OpenCV
def validate_codes(code_type):
    if ARUCO_DICT.get(code_type, None) is None:
        return False
    return True


def calculate_lat_angle(image, knee, ankle, color):
    # vertical from height of knee to height of ankle
    cv2.line(image, knee, (knee[0],
                           ankle[1]), color, 2)
    cv2.line(image, knee, ankle,
             color, 2)  # knee to ankle
    max_x = max(knee[0], ankle[0])
    min_x = min(knee[0], ankle[0])
    max_y = max(knee[1], ankle[1])
    min_y = min(knee[1], ankle[1])
    angle = math.atan(
        float(max_x - min_x) / float(max_y - min_y)) * (180 / math.pi)
    cv2.putText(image, str(int(angle)) + " deg",
                (knee[0] + 15, ankle[1]), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
    return angle


def calculate_post_angle(image, left, right, color):
    max_x = max(left[0], right[0])
    min_x = min(left[0], right[0])
    max_y = max(left[1], right[1])
    min_y = min(left[1], right[1])
    cv2.line(image, (left[0], max_y), (right[0], max_y),
             color, 2)  # horizontal line
    cv2.line(image, left, right, color, 2)  # hip to hip
    angle = math.atan(
        float(max_y - min_y) / float(max_x - min_x)) * (180 / math.pi)
    cv2.putText(image, str(int(angle)) + " deg",
                (right[0] + 15, max_y), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
    return angle


def detection(in_path, out_path, video_name, code_type):
    if validate_codes(code_type):
        # load the ArUCo dictionary, grab the ArUCo parameters, and detect the markers
        arucoDict = cv2.aruco.Dictionary_get(ARUCO_DICT[code_type])
        arucoParams = cv2.aruco.DetectorParameters_create()
        count = 0
        ids_sum = 0
        output_video = out_path + os.path.splitext(video_name)[0] + "-tmp.mp4"

        video_capture = cv2.VideoCapture(in_path + video_name)
        while True:
            centers = {}
            detected = []
            ret, frame = video_capture.read()
            if ret:
                # print("=================================")
                #print("[INFO] Frame: {}".format(count))
                (corners, ids, rejected) = cv2.aruco.detectMarkers(frame, arucoDict,
                                                                   parameters=arucoParams)
                # verify *at least* one ArUco marker was detected
                if len(corners) > 0:
                    # flatten the ArUco IDs list
                    ids = ids.flatten()
                    # loop over the detected ArUCo corners
                    for (markerCorner, markerID) in zip(corners, ids):
                        # extract the marker corners (which are always returned in
                        # top-left, top-right, bottom-right, and bottom-left order)
                        corners = markerCorner.reshape((4, 2))
                        (topLeft, topRight, bottomRight, bottomLeft) = corners
                        # convert each of the (x, y)-coordinate pairs to integers
                        topRight = (int(topRight[0]), int(topRight[1]))
                        bottomRight = (
                            int(bottomRight[0]), int(bottomRight[1]))
                        bottomLeft = (int(bottomLeft[0]), int(bottomLeft[1]))
                        topLeft = (int(topLeft[0]), int(topLeft[1]))
                        # draw the bounding box of the ArUCo detection
                        cv2.line(frame, topLeft, topRight, (0, 255, 0), 2)
                        cv2.line(frame, topRight, bottomRight, (0, 255, 0), 2)
                        cv2.line(frame, bottomRight,
                                 bottomLeft, (0, 255, 0), 2)
                        cv2.line(frame, bottomLeft, topLeft, (0, 255, 0), 2)
                        # compute and draw the center (x, y)-coordinates of the ArUco
                        # marker
                        cX = int((topLeft[0] + bottomRight[0]) / 2.0)
                        cY = int((topLeft[1] + bottomRight[1]) / 2.0)
                        cv2.circle(frame, (cX, cY), 4, (0, 255, 0), -1)
                        centers[markerID] = (cX, cY)
                        # draw the ArUco marker ID on the frame
                        cv2.putText(frame, str(markerID),
                                    (topLeft[0], topLeft[1] -
                                    15), cv2.FONT_HERSHEY_SIMPLEX,
                                    0.5, (0, 255, 0), 2)
                        detected.append(markerID)
                        ids_sum += 1
                    #print("[INFO] ArUco marker IDs detected: {}".format(detected))
                    #print("Centers: {}".format(centers))
                    if 2 in centers and 0 in centers:
                        angle_lat_left = calculate_lat_angle(
                            frame, centers[2], centers[0], (255, 0, 0))
                        #print("Lateral angle left: {}".format(angle_lat_left))
                    if 3 in centers and 1 in centers:
                        angle_lat_right = calculate_lat_angle(
                            frame, centers[3], centers[1], (0, 0, 255))
                        #print("Lateral angle right: {}".format(angle_lat_right))
                    if 4 in centers and 5 in centers:
                        angle_posterior = calculate_post_angle(
                            frame, centers[4], centers[5], (255, 0, 255))
                        #print("Lateral angle right: {}".format(angle_lat_right))
                if count == 0:
                    height, width, layers = frame.shape
                    # need to compile opencv manually for H264 support
                    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
                    video = cv2.VideoWriter(
                        output_video, fourcc, 30, (width, height))
                else:
                    video.write(frame)
                count += 1
            else:
                if "video" in locals():
                    video.release()
                break
        video_capture.release()
        # quick and dirty fix to convert to h264 encoding
        os.system("ffmpeg -y -i " + output_video + " -vcodec h264 " +
                  out_path + os.path.splitext(video_name)[0] + ".mp4")
        os.system("rm " + output_video)
        return os.path.splitext(video_name)[0] + ".mp4"

    return video_name
