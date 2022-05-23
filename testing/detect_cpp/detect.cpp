#include <opencv2/opencv.hpp>
#include <opencv2/aruco.hpp>
#include <opencv2/videoio.hpp>
#include <opencv2/videoio/videoio_c.h>

// using namespace cv;
// using namespace std;

int main(int argc, char **argv)
{
    cv::Size S = cv::Size(1280, 720);
    int fourcc = CV_FOURCC('a', 'v', 'c', '1');
    cv::VideoWriter outputVideo("output.mp4", 0, fourcc, 30, S, true);
    cv::VideoCapture inputVideo;
    inputVideo.open(argv[1]);
    cv::Ptr<cv::aruco::Dictionary> dictionary = cv::aruco::getPredefinedDictionary(cv::aruco::DICT_4X4_50);
    while (inputVideo.grab())
    {
        cv::Mat image, imageCopy;
        inputVideo.retrieve(image);
        image.copyTo(imageCopy);
        std::vector<int> ids;
        std::vector<std::vector<cv::Point2f>> corners;
        cv::aruco::detectMarkers(image, dictionary, corners, ids);
        // if at least one marker detected
        if (ids.size() > 0)
            cv::aruco::drawDetectedMarkers(imageCopy, corners, ids);
        outputVideo.write(imageCopy);
        // cv::imshow("out", imageCopy);
        // char key = (char)cv::waitKey(500);
        // if (key == 27)
        // break;
    }
    outputVideo.release();
    inputVideo.release();

    return 0;
}