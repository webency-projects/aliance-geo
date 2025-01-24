import unittest
from service.handler import adjust_coordinates, process_message
import json


test_1 = [[0, 100], [0, 150], [0, 180], [0, 200]]
test_1_ans = [[0, 100], [0, 150], [0, 180], [0, -160]]

test_2 = [[0, 100], [0, 150], [0, 180], [0, 150]]
test_2_ans = [[0, 100], [0, 150], [0, 180], [0, 150]]


class TestCoordinates(unittest.TestCase):

    def test_is_antimeridian_true(self):
        results = adjust_coordinates(test_1)
        self.assertTrue(results[1])

    def test_check_results(self):
        results = adjust_coordinates(test_1)
        self.assertEqual(len(results[0]), len(test_1_ans))
        for i, item in enumerate(results[0]):
            self.assertEqual(item[1], test_1_ans[i][1])

    def test_is_antimeridian_false(self):
        results = adjust_coordinates(test_2)
        self.assertFalse(results[1])

    def test_check_results_not_change(self):
        results = adjust_coordinates(test_2)
        self.assertEqual(len(results[0]), len(test_2_ans))
        for i, item in enumerate(results[0]):
            self.assertEqual(item[1], test_2[i][1])
            self.assertEqual(item[1], test_2_ans[i][1])


message_test = json.dumps({"type":"Feature","properties":{"name":"London"},"geometry":{"type":"Polygon","coordinates":[[[-0.455933,16.167197],[-1.290894,15.077428],[-0.093384,14.562318],[1.032715,15.538376],[-0.455933,16.167197]]]}})
message_test_2 = json.dumps({"type":"Feature","properties":{"name":"London"},"geometry":{"type":"Polygon","coordinates":[[[-0.455933,16.167197],[-1.290894,181.077428],[-0.093384,14.562318],[1.032715,15.538376],[-0.455933,16.167197]]]}})


class TestProcessMessage(unittest.TestCase):

    def test_process_message_is_not_antimeridian(self):
        results = process_message(message_test)
        self.assertFalse(results['properties']['antimeridian'])

    def test_process_message_is_antimeridian(self):
        results = process_message(message_test_2)
        self.assertTrue(results['properties']['antimeridian'])


if __name__ == '__main__':
    unittest.main()
